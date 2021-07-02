# Modified Version of The Composition Reuse Example

This is a modified version of the "reuse-07-example-starting-project" project from Max Schwarzmüller's Udemy course on Vue 3.  I've done the following changes:

* Used TypeScript
* Made the search case-insensitive.
* Made the sort buttons unselectable. More on that below.
* Fixed an issue with the Projects List view disappearing the input box once the selection string drives the selected projects to zero :-)

This version works, except for one issue I think is related to Vue reactivity: I can unselect a sort button and set the sorting reactive variable back to null, but now that I've done the useSorting hook using Max's technique that passes a ref to an array rather than a non-reactive array, the sort no longer returns to the "unsorted" state. In the original exercise, this worked w/o problem.


 
