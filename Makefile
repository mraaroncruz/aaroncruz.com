dev:
	foreman start

deploy:
	@./publish.sh
	@git push origin gh-pages
