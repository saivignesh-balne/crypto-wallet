export default function Features() {
    const features = [
      { title: "Bitcoin in DeFi", desc: "Use BTC in Ethereum/BSC DeFi protocols." },
      { title: "Cross-Chain Swaps", desc: "Swap assets between chains in seconds." },
      { title: "Non-Custodial", desc: "Your keys, your crypto. Always." }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        {features.map((feat, i) => (
          <div key={i} className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
            <p>{feat.desc}</p>
          </div>
        ))}
      </div>
    );
  }