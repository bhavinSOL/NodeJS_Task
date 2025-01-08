import fs from 'fs'
const task = process.argv[2];
switch(task){
    case 'list':
        listTodo()
        break
    case 'add':
        addtoDo(task)
        break
    case 'remove' || 'delete':
        deletetodo()
      
        break
    default:
        console.log('Invalid task')

}
function count(){
    
   return fs.readFileSync('todo.txt', 'utf8').split('\n').length
}
function addtoDo(list_of){
    const task= process.argv.slice(3).join(" ");
    try{
        let num=count()
        fs.appendFileSync('todo.txt', `${num++}. ${task}\n`)
        console.log(`${task} is added into TODO`)
    }
    catch (error) {
        console.error("Error :", error.message);
      }
}
function listTodo(){
    try{
        const data = fs.readFileSync('todo.txt', 'utf8');
        console.log('********* TODO LIST **********')
        console.log(data);
    }
    catch (error) {
        console.error("Error :", error.message);
      }
}


function deletetodo() {
  try {
    const taskNumber = parseInt(process.argv.slice(3).join(" "));
    const data = fs.readFileSync("todo.txt", "utf8");
    const lines = data.split("\n").filter(Boolean);
    lines.splice(taskNumber - 1, 1);
    const updatedTasks = lines.map((task, index) => `${index + 1}. ${task.replace(/^\d+\.\s*/, "")}`);
    fs.writeFileSync("todo.txt", updatedTasks.join("\n"));
    fs.appendFileSync('todo.txt','\n');
    console.log(`Task ${taskNumber} deleted and list rearranged.`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}


