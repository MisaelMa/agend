export default ({store, redirect}:any) => {
    // If the user is not authenticated
       //console.log(getModule(Authenticate,store).AuthSession)
    if (!store.state.auth) {
        return redirect('/login')
    }
}
