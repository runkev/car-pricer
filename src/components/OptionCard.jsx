import PropTypes from 'prop-types'

function OptionCard({ option, isSelected, onToggle }) {
    return (
    <div 
        className={`bg-white rounded-lg p-4 shadow-sm cursor-pointer mb-4
        active:transform active:scale-[0.99] transition-transform
        ${isSelected ? 'border-2 border-green-500' : 'border border-gray-200 hover:bg-gray-100'}`}
        onClick={() => onToggle(option.id)}
    >
        <div className="flex justify-between items-center">
            <span className="text-lg">{option.name}</span>
            <div className="space-x-4 ">
                <span>${option.invoicePrice.toLocaleString()}</span>
                <span>${option.msrp.toLocaleString()}</span>
            </div>
        </div>
    </div>
    )
}

OptionCard.propTypes = {
    option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    invoicePrice: PropTypes.number.isRequired,
    msrp: PropTypes.number.isRequired
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
}

export default OptionCard