/**
 * 递归式深度遍历tree
 */
function deepTravel(tree, nodeList = []) {
  if(tree) {
    nodeList.push(tree);
    for(let i of Object.keys(tree.children)) {
      deepTravel(tree.children[i], nodeList)
    }
  }
  return nodeList;
}

/**
 * 非递归式 遍历tree
 * 
 * 使用：栈
 * 但入栈时是反着把 children 数组 push 入栈的，保证下一次 pop 能拿到左子树元素
 */
function deepTravel(tree) {
  let stack = [];
  let nodeList = [];
  tree && stack.push(tree);
  //注意，这里如果 while(stack) 会死循环
  while(stack.length) {
    let node = stack.pop();
    nodeList.push(node);
    for(let i = node.children.length - 1; i >= 0; i --) {
      stack.push(node.children[i]);
    }
  }
}

for (let i = 3; i--;) {
  console.log(i)
}
for (let i = 3; i >= 0; i--) {
  console.log(i)
}

//深度优先遍历是指：从一个结点出发，找到其相邻节点，然后是相邻节点的相邻节点
function deepTravels(nodes) {
  var node = []
  if(nodes != null) {
    node.push(nodes)
    for(let i = 0; i < nodes.children.length; i++) {
      deepTravels(nodes.children[i])
    }
  }
  return node
}
