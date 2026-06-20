export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-green-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Smart Irrigation</h1>

          <div className="space-x-6">
            <a href="#" className="hover:text-green-200">
              Home
            </a>
            <a href="#" className="hover:text-green-200">
              Dashboard
            </a>
            <a href="#" className="hover:text-green-200">
              Sensors
            </a>
            <a href="#" className="hover:text-green-200">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-green-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Smart Farm Monitoring System
          </h2>

          <p className="text-xl mb-8">
            Monitor soil moisture, weather conditions, and control irrigation
            remotely from anywhere.
          </p>

          <button className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200">
            Open Dashboard
          </button>
        </div>
      </section>

      {/* Statistics */}
      <section className="container mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center mb-10">
          Live Farm Status
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-500">
              Soil Humidity
            </h4>
            <p className="text-4xl font-bold text-green-600 mt-4">68%</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-500">Temperature</h4>
            <p className="text-4xl font-bold text-orange-500 mt-4">27°C</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-500">Water Valve</h4>
            <p className="text-4xl font-bold text-blue-600 mt-4">OPEN</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">
            System Features
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="shadow-lg rounded-xl p-6">
              <h4 className="text-xl font-bold mb-4">🌱 Soil Monitoring</h4>
              <p className="text-gray-600">
                Track real-time soil moisture levels from sensors deployed in
                the farm.
              </p>
            </div>

            <div className="shadow-lg rounded-xl p-6">
              <h4 className="text-xl font-bold mb-4">☁ Weather Forecast</h4>
              <p className="text-gray-600">
                View current weather conditions and forecast before irrigation.
              </p>
            </div>

            <div className="shadow-lg rounded-xl p-6">
              <h4 className="text-xl font-bold mb-4">💧 Smart Irrigation</h4>
              <p className="text-gray-600">
                Automatically open and close water valves based on sensor data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-700 text-white py-16 text-center">
        <h3 className="text-4xl font-bold mb-4">Ready to Manage Your Farm?</h3>

        <p className="mb-6 text-lg">
          Access your dashboard and monitor your irrigation system in real time.
        </p>

        <button className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200">
          Go to Dashboard
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>© 2026 Smart Irrigation System. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
