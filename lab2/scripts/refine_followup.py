"""Amplía hacia abajo el POST y repite un nivel GET superior a la zona mixta."""
from refine_threshold import trial, stop

try:
    for rep in (2,3):trial('GET',300,rep)
    levels=[1500,3000,4500,6000,7500]
    measured={n:trial('POST',n)['overall']['error_pct'] for n in levels}
    good=[n for n,e in measured.items() if e<=2]
    bad=[n for n,e in measured.items() if e>2]
    if good and bad and max(good)<min(bad):
        low,high=max(good),min(bad)
        while high-low>750:
            mid=(low+high)//2
            error=trial('POST',mid)['overall']['error_pct']
            if error<=2:low=mid
            else:high=mid
        for n in (low,high):
            for rep in (2,3):trial('POST',n,rep)
        print('REPEATED BRACKET POST',low,high,flush=True)
    print('FOLLOWUP COMPLETE',flush=True)
finally:stop()
