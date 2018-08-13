import styled from 'styled-components';

export const Legende = styled.div`
  text-align: center;
  border: 1px dotted silver;
  padding: .5em;
`;

export const Month = styled.div`
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 2em;
  line-height: 1.2;
  /* text-align: center; */
  background: #ddd;
  padding: .15em .5em;
  border-radius: .35rem;
`;

export const CalenDay = styled.div`
  background: #eee;
  border-radius: .35rem;
  font-size: .8em;
  font-family: Montserrat, sans-serif;
  line-height: 1.2;
  padding: .5em;
  text-align: center;
  width: 6.5em;
  cursor: default;

  .monthDay {
    font-size: 3em;
    display: inline-block;
    line-height: 1;
    letter-spacing: .05em;
  }

  .month {
    font-weight: bold;
  }

  span {
    display: block;
  }
`;

export const CalenDayDimmed = styled(CalenDay)`
  opacity: .25;
`;

export const Place = styled.div`
  opacity: .5;
  font-size: .8em;
  font-style: italic;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 1.5em;
  line-height: 1;
`;

export const Label = styled.span`
  background: ${({ color }) => color || '#ddd'};
  border-radius: .5em;
  border: 1px solid transparent;
  display: inline-block;
  font-family: sans;
  font-size: .75em;
  margin-right: .5em;
  padding: 0 .5em;
  cursor: default;
`;

export const Event = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 1.5em;
  ${CalenDay} {
    margin-right: 1em;
     flex: 0 0 auto;
  }
`;
