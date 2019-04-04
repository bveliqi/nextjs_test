import fetch from "isomorphic-unfetch";

class BlogService {


    static get_description = description => {
        let new_description = description.split('<p>')[1].split('</p>')[0];
        new_description = new_description.split('. ');
        new_description = new_description.slice(0, 3).join('. ');
        return new_description + '.' // first p only
    };


    get_blogs = async () => {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/layer7-ai');
        const data = await res.json();

        console.log(`Show data fetched. Count: ${data.items.length}`);

        const items = data.items.map(function (item) {
            return {
                title: item.title,
                link: item.link,
                thumbnail: item.thumbnail,
                description: BlogService.get_description(item.description)
            }
        });

        return {
            items: items
        }
    }

}

export default BlogService