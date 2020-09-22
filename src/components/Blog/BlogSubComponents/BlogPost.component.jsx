import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 20,
    marginRight: 20,
  },
}));
const BlogPost = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3">Corona virus prevention</Typography>
      <Typography variant="subtitle2" gutterBottom>
        March 2020
      </Typography>
      <Typography variant="body1" gutterBottom>
        As COVID-19 spread rapidly here, our health and government officials
        across the country asked all of us to take additional steps to slow the
        spread of the disease, including: Social distancing — Stay at least 6
        feet away from other people and avoid large groups. Work from home if
        possible. Visit with loved ones via electronic devices. Learn more about
        the importance of social distancing.
        <br />
        <b>Facemasks</b> — Wear a facemask or other cloth face covering (e.g.
        bandana, scarf), especially in public areas where social distancing can
        be difficult (grocery stores, pharmacies). Surgical masks and N-95
        respirators are in limited supply and need to be reserved for healthcare
        workers and medical first responders. If your doctor tells you to wear a
        medical mask, that’s okay too. The Centers for Disease Control and
        Prevention (CDC) offers instructions for making and wearing a facemask.
        It’s important to know that fabric masks aren’t as protective as medical
        masks but if we all work together, they can really make a difference.
        Fabric masks trap your respiratory droplets (even the ones you can’t see
        from talking and breathing) and hold them in the mask so they don’t land
        on shared surfaces (like the railing on the train) or on other people
        (like the person next to you in line). Since anyone can be shedding
        virus, even if they don’t have any symptoms, it’s important for everyone
        to wear these masks all the time.
        <br />
        <b>Stay-at-home orders</b> — Some states, including Illinois, have
        enacted stay-at-home orders requiring people to remain in their homes
        unless they have an essential job, or are doing an essential task, such
        as grocery shopping or walking their dog. These orders have really
        changed things. Still, it can be very hard to understand why they are
        necessary, especially in places where there aren’t very many cases. It’s
        important to remember that every single one of us is susceptible to this
        infection and there are no vaccines or antivirals. And our hospitals and
        clinics are not able to handle all of us being sick at the same time.
        The best and most effective way to implement a stay-at-home order is
        early on, when very few people are sick. In that setting, staying home
        will save the most lives and be able to be lifted more quickly. Once a
        city or town is experiencing lots and lots of cases, it can take a very
        long time for the infection rate to come back down to manageable levels.
        Even then, strict public health measures will be needed to keep the
        virus contained until there are vaccines or effective antivirals. The
        more we work together and take proactive steps to prevent spread of
        COVID-19, the sooner we can get back to work and get our economy back on
        track. Quarantine — If you or a family member have been exposed to the
        coronavirus or gets sick with COVID-19, you could find yourself in a
        mandatory 14-day (or longer) quarantine. You won’t be allowed to leave
        your home, even to run errands. Right now it feels like we are all in an
        extended quarantine but any re-opening of the economy will require us to
        return to strict containment measures including 14-day quarantines for
        those who are exposed.
        <br />
        <b>Isolation</b> — If someone in your home starts to feel sick they
        should isolate themselves inside the home, using a different bedroom or
        bathroom then others in your household, if possible. You can find good
        information on the CDC website to help you protect others in your house.
        We shouldn't be staying at home or distancing because we’re scared. The
        individual risk to any one of us is low. We are taking these actions
        because we need to protect those of us who are at a higher risk. The
        speed at which this disease spreads throughout our community makes a big
        difference in terms of how many people are sick at the same time and
        whether or not we have enough beds for all the patients who need care.
        Even healthy people can get very sick with this virus and most of these
        patients can and will survive
      </Typography>
    </div>
  );
};
export default BlogPost;
