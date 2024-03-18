import './App.css';
import { Shelves } from './Shelves';

const exampleImageUrl =
  'https://raw.githubusercontent.com/ahmetturkmen/CV-P1-2019-2020/master/data_/shelves/m1_shelf.jpg';

function App() {
  return (
    <Shelves
      imgUrl={exampleImageUrl}
      shelvesDefinition={[]}
      onChange={(value: [number, number][][]) => {
        console.table(value.map((v) => JSON.stringify(v)));
      }}
    />
  );
}

export default App;
