import {useState} from 'react'
import camryData from './data/camryData'
import OptionCard from './components/OptionCard';

function App() {
  const [selectedOptions, setSelectedOptions] = useState(new Set());

  const toggleOption = (optionId) => {
    const newSelected = new Set(selectedOptions)
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId)
    } else {
      newSelected.add(optionId)
    }
    setSelectedOptions(newSelected)
  }

  const resetSelections = () => {
    setSelectedOptions(new Set())
  }

  const calculateTotals = () => {
    let invoice = 0;
    let msrp = 0;

    camryData.base.forEach(item => {
      invoice += item.invoice;
      msrp += item.msrp;
    })

    camryData.additionalEquipment.forEach(item => {
      if (selectedOptions.has(item.id)) {
        invoice += item.invoicePrice
        msrp += item.msrp
      }
    })

    camryData.portInstalledOptions.forEach(item => {
      if (selectedOptions.has(item.id)) {
        invoice += item.invoicePrice
        msrp += item.msrp
      }
    })

    return { invoice, msrp }
  }

  const totals = calculateTotals();
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky navbar */}
      <div className="sticky top-0 bg-white shadow-md z-10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div>
                <span className="mr-2">Invoice:</span>
                <span className="font-bold">${totals.invoice.toLocaleString()}</span>
              </div>
              <div>
                <span className="mr-2">MSRP:</span>
                <span className="font-bold">${totals.msrp.toLocaleString()}</span>
              </div>
            </div>
            <button 
              onClick={resetSelections}
              className="px-4 py-2 bg-red-300 hover:bg-red-400 rounded transition-transform
              active:transform active:scale-[0.99]"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Additional Equipment */}
        <h2 className="text-xl font-semibold mb-4">Additional Equipment</h2>
        {camryData.additionalEquipment.map(option => (
          <OptionCard 
            key={option.id} 
            option={option} 
            isSelected={selectedOptions.has(option.id)}
            onToggle={toggleOption}
          />
        ))}

        {/* Port Installed Options */}
        <h2 className="text-xl font-semibold mb-4 mt-8">Port Installed Options</h2>
        {camryData.portInstalledOptions.map(option => (
          <OptionCard 
            key={option.id} 
            option={option} 
            isSelected={selectedOptions.has(option.id)}
            onToggle={toggleOption}
          />
        ))}
      </div>
    </div>
  )
}


export default App