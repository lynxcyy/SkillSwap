import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          404
        </h1>
        <h2 className="text-xl font-semibold text-foreground">
          Halaman Tidak Ditemukan
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Maaf, halaman yang kamu cari mungkin sudah dihapus, namanya diubah, atau sementara tidak tersedia.
        </p>
        <div className="flex justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
