# How to run

### `npm install && npm start`

# Build for production

### `npm run build`

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
| No. | Entity                   | Parameters                                      | Status |
| --- | ------------------------ | ----------------------------------------------- | ------ |
| 1   | sesisemester             |                                                 | Done   |
| 2   | pensyarah                | session_id, sesi, semester                      | Done   |
| 3   | subjek                   | sesi, semester                                  | Done   |
| 4   | pelajar                  | session_id, sesi, semester, limit, offset       | Done   |
| 5   | pensyarah_subjek         | no_pekerja                                      | Done   |
| 6   | pelajar_subjek           | no_matrik                                       | Done   |
| 7   | subjek_seksyen           | sesi, semester                                  | Done   |
| 8   | subjek_pelajar           | session_id, sesi, semester, kod_subjek, seksyen | Done   |
| 9   | subjek_pensyarah         | kod_subjek, sesi, semester, seksyen             | Done   |
| 10  | kurikulum                | cohort=yyyy/yyyy or none                        | Done   |
| 11  | kurikulum_subjek         | id_kurikulum                                    | Done   |
| 12  | kurikulum_subjek_elektif | id_kurikulum_subjek                             | Done   |
| 13  | ruang                    | kod_fakulti, kod_ruang_like                     | Done   |
| 14  | jadual_ruang             | sesi, semester, kod_ruang                       | Done   |
| 15  | jadual_subjek            | sesi, semester, kod_subjek, seksyen             | Done   |
| 16  | auth                     | username, password                              | Done   |
