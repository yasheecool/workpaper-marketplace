# Listing Create/Update Route Flow

The diagram below shows the route flow for creating and editing a listing. Both Edit and Create pages render the same `ListingEditor` component. The diagram mimics the file/routing structure.  
**Tip:** Open this along with the relevant files (inside the `app/vendor/*` module) for better understanding.  
Also check out the `ListingEditor` component, as it contains logic for pre-filling the form and submission.

```mermaid
graph TD

  %% Entry Points
  Vendor["Vendor"]
  Vendor --> View["(view)"]
  Vendor --> CreateEdit["(listing-create-edit)"]

  %% Viewing Listings
  View --> Listings["/vendor/listings"]
  Listings -->|Click listing| EditRoute["/vendor/listing/edit/:listingId"]

  %% Creation Flow
  CreateEdit --> ContentSelect["/vendor/content-selection"]
  ContentSelect --> Listing["Listing"]
  Listing --> CreateRoute["/vendor/listing/create/:listingId"]
  CreateRoute --> Create["Create"]
  Create --> Editor["WhitelistEditor / ListingEditor"]

  %% Update Flow
  EditRoute --> Edit["Edit"]
  Edit --> Editor

  %% Notes (no special styling)
  Editor --> UpdateNote["Listing Updation Flow: /vendor/listings -> /vendor/listing/edit/:listingId"]
  Editor --> CreateNote["Listing Creation Flow: /vendor/content-selection -> /vendor/listing/create/:listingId"]
```
