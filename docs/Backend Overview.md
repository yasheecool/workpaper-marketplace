## 🧩 Backend Overview

### 📁 File Structure

The backend follows a standard **Node.js + Express + Prisma** architecture:

- `routes/` – Defines all API endpoints grouped by domain.
- `controllers/` – Handles HTTP logic; receives requests from routes and delegates to services.
- `services/` – Contains domain/business logic and talks to the database through Prisma.
- `middleware/` – Includes custom middleware like authentication, error handling, and validation.
- `prisma/` – Prisma schema, migrations, and seeding (`schema.prisma`, `migrations/`, `seed.ts`).

---

### 🔐 Key Middleware: `authMiddleware.ts`

Start by reviewing:

```ts
/middleware/ authMiddleware.ts;
```

It specifically sets the **req.firm** and **req.user** of properties of the request object. Sets req.user to the **uuid in the jwt payload** and assigns the value of `X-Firm-Id` to the **req.firm** value.

### 🔐 Routing Notes

The route files have mainly been seperated by domain/use cases. The route file names are fairly self-explanatory. However, the cases of **requesting a listing** (done by a user firm) and **retrieving a listing's request** (which is done be a vendor firm so that they can APPROVE or REJECT the request) share the same route file i.e `requestRoutes.ts` and the same controller as well.
Please have a look at `listingService.ts` file as well, as it is pretty bloated and needs to be split for better seperation.

### 🔐 How is soft deletion handled?

In the database, a listing has by default a **status** of "**active**". When the listing is "**deleted**" by the vendor, it gets assigned a status of "**deleted**".
Check out the `getMarketplaceListings` function in `listingService.ts` - it only returns the listings that have a status of **"active"**. However, these listings are still included in other requests, these "soft deleted" listings are then displayed accordingly in the client side to let the user know.

### Mocking the Workpapers API

- Check the `sdk/workpapersApi.ts` file that exports a SDK instance to the app.

  -The SDK has two methods and it's methods are utilized by **`workpapersService.ts`**. The SDK's methods are

  - **getContent**: It returns content that the current firm has available to create a listing for.
    It imports the data from `prisma/content.json` file - which contains **10 pieces of content** (5 for each firm).
    These content are simply filtered in the **getCOntent** method based on the current firm id. and returns them .
    The content themselves contain an ownerFirmId property, which allows them to be filtered.
  - **subscribeToContent**: This method is called, specifically when a firm is installing a listing. For now, it simply returns a resolved promise, which then allows the db record to be updated.

- Check the `workpapersService` for better understanding now.
