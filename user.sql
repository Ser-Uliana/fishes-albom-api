--
-- PostgreSQL database dump
--

\restrict 9cAo3crLPOqZQVFQkD6DABxXG7Re4wqozKJw0kP0NnAeM7hiWUXCgnX8TOpSRp2

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

INSERT INTO public."User" (email, id, password, role, "twoFactorEnabled", "twoFactorSecret") VALUES ('serbina.u.t@gmail.com', 1, '$2b$10$/UUmpZKCb8dln48a0ufM9udrImTjdODP6i87umEE6EPb0hJ/0f18C', 'admin', false, NULL);
INSERT INTO public."User" (email, id, password, role, "twoFactorEnabled", "twoFactorSecret") VALUES ('Kosivvlad85@gmail.com', 2, '$2b$10$/UUmpZKCb8dln48a0ufM9udrImTjdODP6i87umEE6EPb0hJ/0f18C', 'admin', false, NULL);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ulianaserbina
--

SELECT pg_catalog.setval('public."User_id_seq"', 2, true);


--
-- PostgreSQL database dump complete
--

\unrestrict 9cAo3crLPOqZQVFQkD6DABxXG7Re4wqozKJw0kP0NnAeM7hiWUXCgnX8TOpSRp2

