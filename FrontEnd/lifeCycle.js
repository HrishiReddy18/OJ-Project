// Old state  → compute nextState
//            → decide (shouldComponentUpdate)
//            → render using nextState
//            → commit
//            → NOW assign this.state = nextState
////////////////////////////////////////////////////////////////////////////
// React computes nextState
// shouldComponentUpdate(nextProps, nextState)
// render()
// getSnapshotBeforeUpdate(prevProps, prevState)
// getDerivedStateFromProps(nextProps, prevState)
// Commit (DOM update)
// ComponentDidUpdate(prevProps, prevState)
////////////////////////////////////////////////////////////////////////////
