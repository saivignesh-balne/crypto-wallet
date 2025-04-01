export default function Download() {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-8">Download $$Wallet Name</h1>
        <div className="flex justify-center gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-lg">iOS</button>
          <button className="bg-black text-white px-6 py-3 rounded-lg">Android</button>
          <button className="bg-black text-white px-6 py-3 rounded-lg">Desktop</button>
        </div>
      </div>
    );
  }