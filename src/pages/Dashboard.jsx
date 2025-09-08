import { Fragment } from 'react'
import CardData from '../components/CardData'
import { FaBlog } from 'react-icons/fa'
import { GrResources } from 'react-icons/gr'
import { MdEmojiEvents, MdPermMedia } from 'react-icons/md'

const Dashboard = () => {
    return (
        <Fragment>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <CardData title="Total Blogs" total={1} rate="0%" levelUp>
                    <FaBlog size={22} className="text-[#3C0A6D]" />
                </CardData>

                <CardData title="Total Events" total={2} rate="0%" levelUp>
                    <MdEmojiEvents size={22} className="text-[#3C0A6D]" />
                </CardData>

                <CardData title="Total Media" total={0} rate="0%" levelUp>
                    <MdPermMedia size={22} className="text-[#3C0A6D]" />
                </CardData>

                <CardData title="Total Resource" total={0} rate="0%" levelDown>
                    <GrResources size={22} className="text-[#3C0A6D]" />
                </CardData>
            </div>
        </Fragment>
    )
}

export default Dashboard