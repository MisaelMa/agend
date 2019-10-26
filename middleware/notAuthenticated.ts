export default  ({ store, redirect }:any) => {
    // If the user is authenticated redirect to home page
     if (store.state.auth) {

        return redirect('/')
    }
}
