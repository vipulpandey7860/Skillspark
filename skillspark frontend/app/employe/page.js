"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'


const page = () => {

  const router = useRouter();
  const { isAuthenticated } = useSelector(state => state.employeReducer)
  
  useEffect(() => {

    if (isAuthenticated) {
      router.push('/employe/auth')
    }
  }, [isAuthenticated])

  return (

      <>
        <div className="container mx-auto px-4">
      <div className="text-center py-10 font-bold relative">
        <h3 className="text-5xl text-[#333333] relative z-10">
          Connect with Top Talent
        </h3>
        <img
          src="https://internshala.com/static/images/home/sprites/underline_fire.png"
          alt="Image description"
          className="mt-4 mx-auto w-[20vw]"
        />
      </div>

      <div className="flex flex-col items-center">
        <div className="pb-10">
          <p className="font-bold text-2xl md:text-3xl text-[#333333]">
              Trending on Internshala 🔥</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <img
            src="/slider_image1.png"
            alt="image"
            className="w-full md:w-1/3 max-h-64"
          />
          <img
            src="/slider_image2.png"
            alt="image"
            className="w-full md:w-1/3 max-h-64"
          />
          <img
            src="/slider_image3.png"
            alt="image"
            className="w-full md:w-1/3 max-h-64"
          />
        </div>
      </div>

      <div className="w-11/12 mx-auto my-20">
        <h1 className="text-4xl mb-4">Find the Right Talent</h1>
        <div className="description flex justify-between items-center">
          <p className=" text-sm font-semibold text-gray-700">Hire from a pool of skilled candidates</p>
          <p id="view_more">
            <a href="#" className="text-blue-500 font-semibold hover:underline">
              View all Candidates
              <i className="fas fa-arrow-right ml-1"></i>
            </a>
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-4 mt-4">
          <div className="card gap-2 font-semibold flex flex-col items-center">
            <div className='rounded-md max-h-[7vmax] object-contain object-top overflow-hidden'>
              <img
                src="https://img.freepik.com/free-vector/isometric-tecnology-abstract-background_52683-845.jpg?w=740&t=st=1695048038~exp=1695048638~hmac=fd3480028411a88fad80a4e9f55b44926c6f1adbec6cfb2766d187cebb16faec"
                alt="Technology"
              />
            </div>
            <div className="title text-center">Technology</div>
          </div>
          <div className="card gap-2 font-semibold flex flex-col items-center">
            <div className='rounded-md max-h-[7vmax] object-contain object-top overflow-hidden'>
              <img
                src="https://img.freepik.com/free-vector/marketing-consulting-concept-illustration_114360-9027.jpg?w=996&t=st=1695048084~exp=1695048684~hmac=c96889769d255fce2b9d2800414de00854a484085b4be7f7ee341906b0bbfc65"
                alt="Marketing"
              />
            </div>
            <div className="title text-center">Marketing</div>
          </div>
          <div className="card gap-2 font-semibold flex flex-col items-center">
            <div className='rounded-md max-h-[7vmax] object-contain object-top overflow-hidden'>
              <img
                src="https://img.freepik.com/free-photo/accountant-calculating-profit-with-financial-analysis-graphs_74855-4937.jpg?w=996&t=st=1695048128~exp=1695048728~hmac=b865b163bad1ca78655cce16f85a47bc5f44a338eccd1e489d3923fea95a4fed"
                alt="Finance"
              />
            </div>
            <div className="title text-center">Finance</div>
          </div>
          <div className="card gap-2 font-semibold flex flex-col items-center">
            <div className='rounded-md max-h-[7vmax] object-contain object-top overflow-hidden'>
              <img
                src="https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg?w=740&t=st=1695048157~exp=1695048757~hmac=ae5968b91418a6a716830529a04f22a64c3ff6f97e7c5a1711438fe8913a68b0"
                alt="Healthcare"
              />
            </div>
            <div className="title text-center">Healthcare</div>
          </div>
          <div className="card gap-2 font-semibold flex flex-col items-center">
            <div className='rounded-md max-h-[7vmax] object-contain object-top overflow-hidden'>
              <img
                src="https://img.freepik.com/premium-photo/book-with-pencils-rocket-it_850197-2626.jpg?w=1060"
                alt="Education"
              />
            </div>
            <div className="title text-center">Education</div>
          </div>
          <div className="card gap-2 font-semibold flex flex-col items-center">
            <div className='rounded-md max-h-[7vmax] object-contain object-top overflow-hidden'>
              <img
                src="https://img.freepik.com/free-photo/view-3d-man-with-tech-device_23-2150710042.jpg?t=st=1695047673~exp=1695051273~hmac=1e400fd5dbb37ae2e2773172a66cdf864ec44da0a1bf847a650536aeec348845&w=740"
                alt="Design"
              />
            </div>
            <div className="title text-center">Design</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16 px-5">
        <div className="container">
          <h1 className="text-4xl text-center font-bold text-[#31010]">
            Why Choose Internshala for Hiring?
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            <div className="text-center">
              <img
                src="https://img.freepik.com/free-vector/recruitment-concept_52683-43936.jpg?w=740&t=st=1695048461~exp=1695049061~hmac=2ef91a3cf4a467536b7d21a0aa40bde44b906780aa2cb0f34b3ae94736616261"
                alt="Image1"
                className="mx-auto  max-h-48 "
              />
              <h2 className="text-xl font-semibold mt-4">Quality Candidates</h2>
              <p className="text-gray-600 mt-2">
                Access a large pool of talented and skilled candidates.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://img.freepik.com/free-vector/man-having-online-job-interview_52683-43379.jpg?t=st=1695048714~exp=1695049314~hmac=b6a6f34e8a49f7f0570572e62cba451c18bbfee3c1982600e5daa38e959b748b"
                alt="Image2"
                className="mx-auto max-h-48"
              />
              <h2 className="text-xl font-semibold mt-4">Hassle-Free Hiring</h2>
              <p className="text-gray-600 mt-2">
                Streamlined hiring process with easy-to-use tools.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://img.freepik.com/free-vector/choice-worker-concept_23-2148621469.jpg?w=740&t=st=1695048722~exp=1695049322~hmac=97dad44c15ac562873e9d905683f0e4158f7cab39065b12e3800a449a8fd40f9"
                alt="Image3"
                className="mx-auto max-h-48"
              />
              <h2 className="text-xl font-semibold mt-4">Diverse Talent</h2>
              <p className="text-gray-600 mt-2">
                Find candidates from various backgrounds and experiences.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://img.freepik.com/free-vector/job-interview-concept-idea-employment-hiring-procedure-recruiter-searching-job-candidate-isolated-flat-vector-illustration_613284-2727.jpg?w=740&t=st=1695048804~exp=1695049404~hmac=8a16a3d66da7d345d385017984579d2e30a5506006347bf4f261519522b353b3"
                alt="Image4"
                className="mx-auto max-h-48"
              />
              <h2 className="text-xl font-semibold mt-4">Cost-Effective</h2>
              <p className="text-gray-600 mt-2">
                Affordable hiring solutions for all types of businesses.
              </p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
      </>
  )
}

export default page