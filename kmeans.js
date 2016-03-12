

function calculateClusterCenters(observations, clusterLabels)
{
	var clusterCnt = uniq(clusterLabels).length;
	var observationCnt = observations.length;
	
	var centerMatrix = [];
	
	for (var i = 0; i < clusterCnt; i++)
	{
		// Get all observations for this cluster
		var myObs = [];
		for (var j = 0; j < clusterLabels.length; j++)
		{
			if (clusterLabels[j] == i)
			{
				myObs.push(observations[j]);
			}
		}
		
		var mean1 = 0;
		var mean2 = 0;
		
		for (var m = 0; m < myObs.length; m++)
		{
			mean1 += myObs[m][0];
			mean2 += myObs[m][1];
		}
		mean1 = mean1 / myObs.length;
		mean2 = mean2 / myObs.length;
			
		centerMatrix.push([Math.round(mean1*100,2)/100, Math.round(mean2*100,2)/100]);
	}
	
	return centerMatrix;
	
	
}

function findLabelofClosestCluster(observations, clusterCenters)
{
	var clusterCnt = clusterCenters.length;
	var observationCnt = observations.length;
	
	var closestCenters = [];
	
	// Loop through the observations
	for (var i = 0; i < observationCnt; i++)
	{
		var smallestCluster = [];
		for (var j = 0; j < clusterCnt; j++)
		{
			var distCurr = [observations[i][0] - clusterCenters[j][0],
							observations[i][1] - clusterCenters[j][1]];
		
			var distSqr = Math.pow(distCurr[0], 2) + Math.pow(distCurr[1], 2);
			
			// is this one smaller?
			if (j == 0)
			{
				smallestCluster = [distSqr, j];
			}
			else if (distSqr < smallestCluster[0])
			{
				smallestCluster = [distSqr, j];
			}
		}
		
		// Add this to the list
		closestCenters.push(smallestCluster[1]);
	}
	
	
	return closestCenters;
}

function uniq(tmpArray)
{
	var uniqValues = [];
	
	for (var i = 0; i < tmpArray.length; i++)
	{
		// is it in the list?
		var found = false;
		for (var j = 0; j < uniqValues.length; j++)
		{
			if (tmpArray[i] == uniqValues[j])
			{
				found = true;
			}
		}
		if (!found)
		{
			uniqValues.push(tmpArray[i]);
		}
	}
	
	return uniqValues;
}
