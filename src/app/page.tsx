import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center justify-center px-4 text-center">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Welcome to Kindora
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Small Actions. Greater Impact.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Together, we can build stronger communities and create positive
            social change.
          </p>
        </div>
      </main>
    </>
  );
}
