// import { useState } from "react";
// import NoteContext from "./noteContext";
// // import { useState } from "react";

// const NoteState = (props)=>{

//     const host = "http://localhost:5000";
//     const {showAlert} = props;
//     const temp = []

//     const[notes, setNotes] = useState(temp);

    
//      // fetch all notes
//      const getNote = async () =>{
//       // API CALL-
//       const response = await fetch(`${host}/api/notes/fetchallnotes`,{
//           method: 'GET',
//           headers:{
//               'Content-Type': 'application/json',
//               'auth-token': localStorage.getItem('token')
//           }
//       });

//       const json  = await response.json();
//       setNotes(json);
//     }


//     // add a note
//     const addNote = async (title,description,tag) =>{

//                 // API CALL
//         const response = await fetch(`${host}/api/notes/addnote`,{
//             method: 'POST',
//             headers:{
//                 'Content-Type': 'application/json',
//                 'auth-token': localStorage.getItem('token')
//             },
//             body: JSON.stringify({title,description,tag})
//         });
//         const note = await response.json();
//         setNotes(notes.concat(note));
//     }
    
    
//     //update a note
//     const editNote = async (id,title,description,tag) =>{
//         // API CALL

//         const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
//             method: 'PUT',
//             headers:{
//                 'Content-Type': 'application/json',
//                 'auth-token': localStorage.getItem('token')
//             },
//             body: JSON.stringify({title,description,tag})
//         });
        
//         const json = await response.json();
//         // console.log(json)
//         // logic to edit in client
//         for (let index = 0; index < notes.length; index++) {
//             const element = notes[index];
//             if(element._id === id)
//             {
//                 notes[index].title = title;
//                 notes[index].tag = tag;
//                 notes[index].description = description;
//             }   
//         }
        
//         // showAlert("Note deleted sucessfully","success");
//     }
    
//     // delete a note
//     const deleteNote = async(id) =>{
//         //TO DO: API CALL
//         const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
//           method: 'DELETE',
//           headers:{
//               'Content-Type': 'application/json',
//               'auth-token': localStorage.getItem('token')
//           },
//       });
      
//       const json = response.json();
//       console.log(json)



//         // console.log("Deleting the node with id: "+id);
//         const newNotes = notes.filter((note)=>{return note._id!==id})
//         setNotes(newNotes);
//         // showAlert("Note deleted sucessfully","success");
//     }




//     return (
//         <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNote }}  >
//             {props.children}
//         </NoteContext.Provider>
//     )
// }

// export default NoteState;



import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Get all Notes
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        // if(json.length !== 0)
            // console.log("getdata=", json)
        setNotes(json)
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // TODO: API Call
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })

        });
        const note = await response.json();
        setNotes(notes.concat(note))


    }

    // Delete a Note
    const deleteNote = async (id) => {
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            // body: JSON.stringify({ title, description, tag })
        });
        // eslint-disable-next-line
        const json = response.json();

        // console.log("editing note=", json)


        //logic to delete the note
        console.log("Deleting the note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }


    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log("editing note=", json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }



        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;