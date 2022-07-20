const origin = location.href;
console.log(origin)
const topics = ["Vanilla", "Node", "React"];
const topicList = document.getElementById("topic-id");

// fetch(origin + "/cheatcode.json")
//     .then(response => response.json())
//     .then(data => {
//         topics.forEach(topic => {
//             topicList.appendChild(createTopic());
//             const currentTopic = topicList.lastElementChild;
//             currentTopic.textContent = topic;
//             currentTopic.appendChild(document.createElement('ul'));
//             const currentTopicList = currentTopic.lastElementChild;
//             data[topic].forEach(content => {
//                 currentTopicList.appendChild(createContent());
//                 currentTopicList.lastElementChild.innerHTML = `
//                 <a href="${origin}/${topic}/${content}.md">${content}</a>
//                 `;
//             });
//         });

//     });


function createTopic() {
    return document.createElement('li');
}

function createContent() {
    return document.createElement('li');
}