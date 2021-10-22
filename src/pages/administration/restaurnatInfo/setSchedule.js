export const setScheduleState =(state, schedule)=>{
    schedule.forEach((element) => {
        state[element.day] = element.open
        state[element.day + 'Text'] = element.hour
      })

      return state

}