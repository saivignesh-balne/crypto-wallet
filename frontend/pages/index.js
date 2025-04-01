import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>$$Wallet Name | Bitcoin to DeFi Bridge</title>
      </Head>
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-6">Bridge Bitcoin to DeFi</h1>
        <p className="text-xl mb-8">Swap, stake, and earn across Bitcoin, Ethereum, and BSC.</p>
        <Link href="/download">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold">
            Download Wallet
          </button>
        </Link>
      </main>
    </div>
  );
}