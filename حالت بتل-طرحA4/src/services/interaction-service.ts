import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { newsletterSubscribers, orders, questions, reviews } from "@/db/schema";
import type { Question, Review } from "@/data/types";

const seeded = { reviews: false, questions: false };

const REVIEW_SEED = [
  {
    author: "سارا محمدی",
    rating: 5,
    title: "دقیقا همون چیزی که انتظار داشتم",
    body: "کیفیت پارچه و دوخت واقعا خوب بود. بسته‌بندی هم مرتب بود و دو روزه رسید. سایزبندی طبق جدول سایت درست است.",
  },
  {
    author: "امیر رضایی",
    rating: 4,
    title: "ارزش خرید دارد",
    body: "نسبت به قیمتش کیفیت قابل قبولی دارد. فقط رنگ محصول کمی تیره‌تر از تصویر سایت است اما در کل راضی هستم.",
  },
  {
    author: "نگار کاظمی",
    rating: 5,
    title: "خرید دوم من از این فروشگاه",
    body: "قبلا هم از همین برند خرید کرده بودم و کیفیت ثابت مانده. پشتیبانی هم پاسخگو بود و راهنمایی خوبی کردند.",
  },
];

const QUESTION_SEED = [
  {
    author: "محمد ت.",
    body: "این کالا ضمانت اصالت دارد و امکان بررسی هنگام تحویل وجود دارد؟",
    answer:
      "بله، کالا با فاکتور رسمی و کارت ضمانت اصالت ارسال می‌شود و هنگام تحویل امکان بازبینی بسته را دارید.",
  },
  {
    author: "الهام ن.",
    body: "برای ارسال به شهرستان چند روز زمان می‌برد؟",
    answer: "ارسال به مراکز استان‌ها بین ۲ تا ۳ روز کاری و به سایر شهرها تا ۴ روز کاری زمان می‌برد.",
  },
];

async function ensureReviewSeed(productSlug: string) {
  const key = `${productSlug}`;
  if (seeded.reviews) return;
  const existing = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(reviews)
    .where(eq(reviews.productSlug, key));
  if ((existing[0]?.count ?? 0) > 0) return;
  await db.insert(reviews).values(
    REVIEW_SEED.map((r, i) => ({
      productSlug: key,
      author: r.author,
      rating: r.rating,
      title: r.title,
      body: r.body,
      helpful: 3 + i * 4,
    })),
  );
}

async function ensureQuestionSeed(productSlug: string) {
  if (seeded.questions) return;
  const existing = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(questions)
    .where(eq(questions.productSlug, productSlug));
  if ((existing[0]?.count ?? 0) > 0) return;
  await db.insert(questions).values(
    QUESTION_SEED.map((q, i) => ({
      productSlug,
      author: q.author,
      body: q.body,
      answer: q.answer,
      helpful: 2 + i * 3,
    })),
  );
}

function toReview(row: typeof reviews.$inferSelect): Review {
  return {
    id: row.id,
    productSlug: row.productSlug,
    author: row.author,
    rating: row.rating,
    title: row.title,
    body: row.body,
    helpful: row.helpful,
    createdAt: row.createdAt.toISOString(),
  };
}

function toQuestion(row: typeof questions.$inferSelect): Question {
  return {
    id: row.id,
    productSlug: row.productSlug,
    author: row.author,
    body: row.body,
    answer: row.answer,
    helpful: row.helpful,
    createdAt: row.createdAt.toISOString(),
  };
}

export const ReviewService = {
  async list(productSlug: string): Promise<Review[]> {
    await ensureReviewSeed(productSlug);
    const rows = await db
      .select()
      .from(reviews)
      .where(eq(reviews.productSlug, productSlug))
      .orderBy(desc(reviews.createdAt))
      .limit(50);
    return rows.map(toReview);
  },
  async create(input: {
    productSlug: string;
    author: string;
    rating: number;
    title: string;
    body: string;
  }): Promise<Review> {
    const [row] = await db
      .insert(reviews)
      .values({
        productSlug: input.productSlug,
        author: input.author.slice(0, 120),
        rating: Math.min(5, Math.max(1, Math.round(input.rating))),
        title: input.title.slice(0, 200),
        body: input.body.slice(0, 4000),
      })
      .returning();
    return toReview(row);
  },
};

export const QuestionService = {
  async list(productSlug: string): Promise<Question[]> {
    await ensureQuestionSeed(productSlug);
    const rows = await db
      .select()
      .from(questions)
      .where(eq(questions.productSlug, productSlug))
      .orderBy(desc(questions.createdAt))
      .limit(50);
    return rows.map(toQuestion);
  },
  async create(input: { productSlug: string; author: string; body: string }): Promise<Question> {
    const [row] = await db
      .insert(questions)
      .values({
        productSlug: input.productSlug,
        author: input.author.slice(0, 120),
        body: input.body.slice(0, 2000),
      })
      .returning();
    return toQuestion(row);
  },
  async markHelpful(id: number, productSlug: string) {
    await db
      .update(questions)
      .set({ helpful: sql`${questions.helpful} + 1` })
      .where(and(eq(questions.id, id), eq(questions.productSlug, productSlug)));
  },
};

export type OrderInput = {
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  items: { slug: string; title: string; price: number; qty: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
};

export const OrderService = {
  async create(input: OrderInput) {
    const code = `YB-${Date.now().toString().slice(-8)}`;
    const [row] = await db
      .insert(orders)
      .values({
        code,
        customerName: input.customerName,
        phone: input.phone,
        address: input.address,
        note: input.note ?? null,
        items: input.items,
        subtotal: input.subtotal,
        discount: input.discount,
        shipping: input.shipping,
        total: input.total,
      })
      .returning();
    return row;
  },
  async byCode(code: string) {
    const [row] = await db.select().from(orders).where(eq(orders.code, code)).limit(1);
    return row ?? null;
  },
};

export const UserService = {
  async subscribe(email: string) {
    const [row] = await db.insert(newsletterSubscribers).values({ email }).returning();
    return row;
  },
};
