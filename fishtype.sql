--
-- PostgreSQL database dump
--

\restrict oUGEwkMBd5CD38mpNzk18w9RbMFOJ1DJzAqXBLBJVXqhkRuary6rGAepl9cThhR

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
-- Data for Name: FishType; Type: TABLE DATA; Schema: public; Owner: ulianaserbina
--

INSERT INTO public."FishType" (id, name, color) VALUES (1, 'Коропові', '#ef4444');
INSERT INTO public."FishType" (id, name, color) VALUES (2, 'Хижі', '#f97316');
INSERT INTO public."FishType" (id, name, color) VALUES (3, 'Окуневі', '#22c55e');
INSERT INTO public."FishType" (id, name, color) VALUES (4, 'Лососеві', '#3b82f6');
INSERT INTO public."FishType" (id, name, color) VALUES (5, 'Сомові', '#a855f7');
INSERT INTO public."FishType" (id, name, color) VALUES (6, 'Коропові', '#D4A373');
INSERT INTO public."FishType" (id, name, color) VALUES (7, 'Річкова біла риба', '#A8C6D1');
INSERT INTO public."FishType" (id, name, color) VALUES (8, 'Класичні хижаки', '#D97757');
INSERT INTO public."FishType" (id, name, color) VALUES (9, 'Дрібна риба', '#E9C46A');
INSERT INTO public."FishType" (id, name, color) VALUES (10, 'Сомові', '#8D99AE');
INSERT INTO public."FishType" (id, name, color) VALUES (11, 'Морська риба', '#4895B2');
INSERT INTO public."FishType" (id, name, color) VALUES (12, '★ Рідкісні види', '#9B72CF');


--
-- Name: FishType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ulianaserbina
--

SELECT pg_catalog.setval('public."FishType_id_seq"', 12, true);


--
-- PostgreSQL database dump complete
--

\unrestrict oUGEwkMBd5CD38mpNzk18w9RbMFOJ1DJzAqXBLBJVXqhkRuary6rGAepl9cThhR

