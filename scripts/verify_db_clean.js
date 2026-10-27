const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const blogs = await prisma.blog.findMany({ select: { slug: true, title: true, excerpt: true } });
  let blogCount = 0;
  for (const b of blogs) {
    if (/&[a-zA-Z0-9#]+;/.test(b.title) || /&[a-zA-Z0-9#]+;/.test(b.excerpt)) {
      blogCount++;
      console.log('Blog with entity in DB:', b.slug);
    }
  }
  console.log('DB Blogs with entities:', blogCount, 'out of', blogs.length);

  const prods = await prisma.product.findMany();
  let prodCount = 0;
  for (const p of prods) {
    const str = `${p.title} ${p.seoTitle} ${p.metaDescription} ${p.overview} ${p.faq} ${p.features}`;
    if (/&[a-zA-Z0-9#]+;/.test(str)) {
      prodCount++;
      console.log('Product with entity in DB:', p.slug);
    }
  }
  console.log('DB Products with entities:', prodCount, 'out of', prods.length);

  const slides = await prisma.heroSlide.findMany();
  let slideCount = 0;
  for (const s of slides) {
    const str = `${s.heading} ${s.badge} ${s.supportingText} ${s.technicalSpecs}`;
    if (/&[a-zA-Z0-9#]+;/.test(str)) {
      slideCount++;
    }
  }
  console.log('DB HeroSlides with entities:', slideCount, 'out of', slides.length);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
