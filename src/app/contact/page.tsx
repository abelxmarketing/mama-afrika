export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-5xl font-bold text-orange-500 mb-8 text-center">Kontaktieren Sie uns</h1>
        <p className="text-lg text-gray-300 text-center mb-12">
          Haben Sie Fragen, Wünsche oder möchten Sie reservieren? Schreiben Sie uns eine Nachricht oder rufen Sie an.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-zinc-900 p-8 rounded-lg shadow-lg border border-zinc-800">
            <h2 className="text-2xl font-semibold mb-6 text-white">Ihre Nachricht</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-md text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors" placeholder="Ihr Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">E-Mail</label>
                <input type="email" className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-md text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors" placeholder="Ihre E-Mail" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Nachricht</label>
                <textarea rows={4} className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-md text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors" placeholder="Wie können wir Ihnen helfen?"></textarea>
              </div>
              <button type="button" className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 px-4 rounded-md transition-colors">
                Nachricht Senden
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-orange-500 mb-2">Adresse</h3>
              <p className="text-gray-300">Mama Afrika Street 12<br/>10115 Berlin, Deutschland</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-500 mb-2">Öffnungszeiten</h3>
              <p className="text-gray-300">Mo - Fr: 17:00 - 23:00 Uhr<br/>Sa - So: 12:00 - 00:00 Uhr</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-500 mb-2">Telefon & E-Mail</h3>
              <p className="text-gray-300">+49 30 1234567<br/>hello@mama-afrika.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
