import { ShoppingBag, Sparkles, Truck } from "lucide-react";

const features = [
  {
    icon: ShoppingBag,
    title: "Crafted Bags",
    text: "A clean ecommerce foundation ready for products, carts, checkout, and admin tools.",
  },
  {
    icon: Truck,
    title: "Order Flow",
    text: "Backend and frontend folders are wired so the app can grow into the full store.",
  },
  {
    icon: Sparkles,
    title: "Tailwind Ready",
    text: "Tailwind CSS is configured for fast, consistent UI development.",
  },
];

function App() {
  return (
    <main className="min-h-screen bg-stone-50 text-zinc-950">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-12">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-950 text-white">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-amber-700">
              Crafton Bags
            </p>
            <h1 className="text-3xl font-semibold sm:text-5xl">
              Your store is initialized.
            </h1>
          </div>
        </div>

        <p className="max-w-2xl text-lg leading-8 text-zinc-700">
          React, Vite, Tailwind CSS, and the Express API are ready. This starter
          screen can now be replaced with your real ecommerce pages.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
                key={feature.title}
              >
                <Icon className="mb-4 text-amber-700" size={26} />
                <h2 className="text-lg font-semibold">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {feature.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
