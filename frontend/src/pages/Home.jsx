import Hero from "../components/Hero"
import FeatureCard from "../components/FeatureCard"

export default function Home(){

  return(

    <div>

      <Hero/>

      <section className="features">

        <FeatureCard
          title="UPI Transaction Analysis"
          description="AI models analyze payment history to understand business income stability."
        />

        <FeatureCard
          title="Digital Credit Score"
          description="Generate a reliable credit score even without traditional banking history."
        />

        <FeatureCard
          title="Loan Eligibility"
          description="Connect directly with lenders who trust your digital financial profile."
        />

      </section>

    </div>

  )

}