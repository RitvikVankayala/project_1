import NumberInput from "../components/NumberInput";
import Use from "../components/Use";
import Cors from "cors";

const cors = Cors();
export default function Home() {
  return (
    <div>
      <h1>page1</h1>
      <Use />
      {/* <NumberInput /> */}
    </div>
  );
}
