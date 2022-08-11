/*
Author: Edmond Huang
Date Modified: 7/22/2022
*/

 /*
Example Output
const users = [
  {userId: "xyz789", projectId: ["abc123", "def456"]},
  {userId: "sdf012", projectId: ["abc123"]},
]

Hints:
for Loop, forEach, map, while
de-duplication: find, HashMap(js: obj)
*/

// Problem Given
const projects = [
  {   
    projectId: "abc123", 
    name: "Project 1", 
    userProjects: [
      { 
        userId: "xyz789", 
        projectId: "abc123", 
        user: { 
          userId: "xyz789",
          email: "user1@test.com"
        }
      },

      {
        userId: "sdf012",
        projectId: "abc123",
        user: {
          userId: "sdf012",
          email: "user2@test.com",
        },
      }
    ],
  },

  {
    projectId: "def456",
    name: "Project 2",
    userProjects: [
      {
        userId: "xyz789",
        projectId: "def456",
        user: {
          userId: "xyz789",
          email: "user1@test.com",
        },
      }
    ],
  }
]

function solution(listOfProjects) {
  // if there are no projects in the list.
  if(!listOfProjects.length) {
    throw new Error("There are no projects in the list!");
  }

  let hashTable = {};
  let listOfUsers = [];

  // loop through projects
  projects.forEach(project => {
    // loop through userProjects
    project["userProjects"].forEach(user => {
      // if a new user appear in the project, then add the information of the new user to [listOfUsers]
      if(!(user.userId in hashTable)) {
        // having a hashTable to check if the user already exist or not, in other words, de-duplication
        hashTable[user.userId] = "exist";
        listOfUsers.push({
          "userId" : user.userId,
          "projectId" : [user.projectId],
        });
      // if an user that already exist in other project, only add the new projectId for that user
      } else {
        listOfUsers.find(item => {
          // Return keyword is a must to return the object
          return item.userId === user.userId;
        })["projectId"].push(user.projectId);
      }
    });
  });
  
  return listOfUsers;
}

try {
  console.log(solution(projects));
}catch(e){
  console.error(e);
}

