

const PriceDetail = () => {
    return (
        <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col gap-3 border-b border-gray-200 pb-5">
                <h1 className="text-blue-950 font-semibold text-lg">Price Details</h1>
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex items-center justify-between">
                        <p>Rp 1,500,000 x 4 nights</p>
                        <p>Rp 6,000,000</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-between">
                <h1>Total (IDR)</h1>
                <h1>Rp 6,000,000</h1>
            </div>
        </div>
    );
};

export default PriceDetail;