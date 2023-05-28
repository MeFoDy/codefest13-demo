module.exports = {
    webStandards: (data) => {
        return data.episodes.rss.channel[0].item;
    },
};
