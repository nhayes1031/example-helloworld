import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { 
  checkProgram, 
  establishConnection, 
  establishPayer, 
  populatePayer, 
  populateProgramKeypair, 
  reportGreetings, 
  sayHello 
} from "./hello_world";
import { readAccountFromFile } from "./utils";

function App() {
  function UploadPayer(event) {
    readAccountFromFile(event.target.files[0])
      .then((response) => {
        populatePayer(response);
      })
  }

  function UploadProgram(event) {
    readAccountFromFile(event.target.files[0])
      .then((response) => {
        populateProgramKeypair(response);
      })
  }

  async function EndTheWorld() {
    console.log("Ending the world");
    await establishPayer();
    await checkProgram();
    await sayHello();
    await reportGreetings();
  }

  useEffect(() => {
    async function fetchData() {
      await establishConnection();
    }
    fetchData();
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        component="label"
        onChange={UploadPayer}
      >
        Upload a payer keypair file
        <input
          type="file"
          hidden
        />
      </Button>
      <Button
        variant="contained"
        component="label"
        onChange={UploadProgram}
      >
        Upload a program keypair file
        <input
          type="file"
          hidden
        />
      </Button>
      <Button
        variant="contained"
        onClick={EndTheWorld}
      >
        Click me to signal the end of the world
      </Button>
    </div>
  );
}

export default App;
