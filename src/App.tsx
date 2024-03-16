import './App.css';
import { Shelves } from './Shelves';

const exampleImageUrl =
  'https://c8.alamy.com/comp/BEMP56/volvic-bottled-water-on-supermarket-shelves-france-BEMP56.jpg';

function App() {
  return (
    <Shelves
      imgUrl={exampleImageUrl}
      shelvesDefinition={[]}
      onChange={(value: [number, number][][]) =>
        console.table(value.map((v) => JSON.stringify(v)))
      }
    />
  );
}

export default App;
