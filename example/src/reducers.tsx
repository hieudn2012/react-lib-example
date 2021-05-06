const initialState = {
  home: ''
}

export default function Reducer(state = initialState, action: any) {
  switch(action.type) {
    case 'SET_STATE' :
      return { ...state, home: 'ok' }
  }
  return state;
}
