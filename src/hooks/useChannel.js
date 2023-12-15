import { useEffect, useState } from 'react';
import { getChannelListAPI } from '@/apis/article';
function useChannel() {
    const [channelList, setChannelList] = useState([])
    const getChannelList = async () => {
        const res = await getChannelListAPI();
        setChannelList(res.data.channels)
    }
    useEffect(() => {
        getChannelList()
    }, [])

    return {
        channelList
    }
}

export { useChannel }