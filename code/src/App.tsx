import './App.css'

function App() {

    return (
        <div className="min-h-screen min-w-screen bg-gray-300 flex items-center justify-center gap-4 py-12 px-4">
            <div className="bg-white w-[600px] h-[900px] shadow-xl rounded-md overflow-hidden relative">
                <div className="bg-[#FBE7DE] h-[40%] flex flex-col items-center justify-start pt-8 relative z-10 px-6">
                    <p className="text-xs text-gray-600 tracking-widest mb-4">MARY SMITH</p>
                    <div className="w-48 h-64 rounded-md overflow-hidden shadow-md border-4 border-white -mb-8 z-20">
                        <img
                            src="https://i.ibb.co/3Y4rVmt/model.png"
                            alt="Portrait"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="bg-white text-center pt-12 pb-6 z-20 relative">
                    <h1 className="text-4xl font-semibold tracking-widest text-gray-800">PORTFOLIO</h1>
                    <p className="text-sm text-gray-600 mt-1">2021 / 2022</p>
                </div>

                <div className="bg-[#787A79] h-[30%] flex items-center justify-center px-10 text-center">
                    <div>
                        <div className="mb-4">
                            <div
                                className="w-10 h-10 mx-auto bg-[#FBE7DE] rounded-full flex items-center justify-center text-xs font-bold text-gray-800">
                                ✦
                            </div>
                            <p className="text-white text-sm uppercase tracking-widest mt-2">Portfolio</p>
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed">
                            Molupti nulparchi ipsam sus, as doluptati vit, veliquation volupta tione impella cearcim
                            iliquamus
                            rerionsend consedio eum sitas vercum, ut explant
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
