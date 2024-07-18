export function App() {
  return (
    <div className="flex flex-col items-center h-screen w-full gap-2 p-2">
      <div className="w-full bg-green-300 rounded-md h-1/3"></div>
      <div className="flex w-full items-center justify-center gap-2 h-full">
        <div className="h-full bg-red-300 rounded-md w-2/3"></div>
        <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
          <div className="bg-blue-300 rounded-md w-full h-1/3"></div>
          <div className="bg-yellow-300 rounded-md w-full h-1/3"></div>
          <div className="bg-purple-300 rounded-md w-full h-1/3"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
