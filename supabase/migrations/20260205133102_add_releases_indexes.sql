CREATE INDEX idx_releases_date_id ON public.releases USING btree (release_date DESC, id);


