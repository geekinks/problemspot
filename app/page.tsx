import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center px-5 py-12 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        <div>
          <p className="bg-secondary text-secondary-foreground mb-6 inline-flex rounded-full px-4 py-2 text-sm font-semibold">
            Community powered progress
          </p>
          <h1 className="text-foreground max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Real community problems. Together, real solutions.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
            ProblemSpot is taking shape. Soon, communities will be able to
            report shared challenges, validate what matters, and work together
            on solutions.
          </p>
          <p className="text-primary mt-8 text-sm font-semibold tracking-widest uppercase">
            Report it. Validate it. Solve it.
          </p>
        </div>
        <div className="bg-brand-white mx-auto w-full max-w-md rounded-2xl p-8 sm:p-12">
          <Image
            src="/brand/problemspot-icon.png"
            alt="ProblemSpot community location pin and idea mark"
            width={1254}
            height={1254}
            priority
            className="h-auto w-full"
          />
        </div>
      </div>
    </main>
  );
}
