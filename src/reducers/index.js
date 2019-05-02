
export function updateDataList(state = {}, action){
  switch(action.type) {
    case "UPDATE_DATA_LIST":
      const { dataList } = action;
      //console.log("inside reducer",dataList);
      return dataList;
    default:
      return state;
  }
}
