import { Card } from "@/components/Card";

function App({ params }: {params: {id: string}}) {

  return (
    <div
      className="w-full max-w-96 flex flex-col gap-4 justify-center items-center bg-black mt-8"
    >
      <Card id={params.id} />
    </div>
  );
}

export default App;
