--
-- PostgreSQL database dump
--

\restrict cO9aLkciCapAJZXsYceIWZRk6kr1B9ThHRYVIz4TW4y3aQPCSqq042Mz0Cec8j7

-- Dumped from database version 18.6 (Postgres.app)
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: ulianaserbina
--

INSERT INTO public."User" (email, id, password, role, "twoFactorEnabled", "twoFactorSecret") VALUES ('serbina.u.t@gmail.com', 1, 'Qwerty1!', 'admin', false, NULL);
INSERT INTO public."User" (email, id, password, role, "twoFactorEnabled", "twoFactorSecret") VALUES ('Kosivvlad85@gmail.com', 2, 'Qwerty1!', 'admin', false, NULL);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ulianaserbina
--

SELECT pg_catalog.setval('public."User_id_seq"', 2, true);


--
-- PostgreSQL database dump complete
--

\unrestrict cO9aLkciCapAJZXsYceIWZRk6kr1B9ThHRYVIz4TW4y3aQPCSqq042Mz0Cec8j7

