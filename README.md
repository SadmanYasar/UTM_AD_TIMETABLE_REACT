# How to run

### `npm install && npm start`

# Build for production

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Tools Used
- React
- Vite
- Typescript
- Shadcn
- Framer Motion
- Tanstack Query
- Tanstack Router
- Tanstack Table

## Services
| Entity                  | Parameters                                | Status |
|-------------------------|-------------------------------------------|--------|
| sesisemester            |                                           | Done   |
| pensyarah               | session_id, sesi, semester                |        |
| subjek                  | sesi, semester                            |        |
| pelajar                 | session_id, sesi, semester, limit, offset |        |
| pensyarah_subjek        | no_pekerja                                |        |
| pelajar_subjek          | no_matrik                                 | Done   |
| subjek_seksyen          | sesi, semester                            |        |
| subjek_pelajar          | session_id, sesi, semester, kod_subjek, seksyen |        |
| subjek_pensyarah        | kod_subjek, [sesi], [semester], [seksyen] |        |
| kurikulum               | [cohort]                                  |        |
| kurikulum_subjek        | id_kurikulum                              |        |
| kurikulum_subjek_elektif | id_kurikulum_subjek                       |        |
| ruang                   | kod_fakulti, kod_ruang_like               |        |
| jadual_ruang            | sesi, semester, kod_ruang                 |        |
| jadual_subjek           | sesi, semester, kod_subjek, seksyen       | Done   |
| auth                    | username,                                 | Done   |
